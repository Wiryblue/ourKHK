import * as React from "react";
import { members } from "./data/members";
import { MemberCard } from "./components/MemberCard";
{/*Will need to set up pagination for previous years' members. Also need to figure out a easily scalable way to display
    member information (something like Jekyll - all info in one file, then you just call the name to display it or smth)
    Setup for member info: Picture, Name, Occupation (if applicable), LinkedIn Profile)*/}

function MemberPage() { 
  return (
    <div className="">
      <header className="text-center">
        <h1 className= "">Our Members</h1>
        <p className="">Click LinkedIn to connect.</p>
      </header>

      <div
        className="grid grid-cols-4 gap-40 px-10"
        aria-label="Members list">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>    
    </div>
  );
}

export default MemberPage