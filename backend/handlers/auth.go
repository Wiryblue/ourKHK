package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("my_secret_key")

// Refers to the details of the user trying to log in
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Refers to the claims that will be included in the Json Web Token
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// Mock function to simulate database retrieval (To be worked)
func getUserPassword(username string) (string, error) {
	// Replace this with actual database retrieval logic
	if username == "user" {
		// This is a bcrypt hashed password for "password"
		return "$2a$14$Wj1Z1Z1Z1Z1Z1Z1Z1Z1Z1u", nil
	}
	return "", fmt.Errorf("user not found")
}

func Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	hashedPassword, err := getUserPassword(creds.Username)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if !checkPasswordHash(creds.Password, hashedPassword) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: creds.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}

func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
