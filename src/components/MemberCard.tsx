import * as React from "react";
import type { Member } from "../types/member";

type MemberCardProps = { member: Member };

export function MemberCard({ member }: MemberCardProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article className="border items-center text-center w-32 h-32"
      data-member-id={member.id}>
      <img src={imgError ? "/images/members/Y.jpg" : member.photoUrl}
        alt={`${member.name} headshot`}
        onError={() => setImgError(true)}
        loading="lazy"
        className="w-24 h-24 object-cover mb-3"/>

      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-gray-600">{member.occupation}</p>

      <a href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-blue-600 hover:underline">
        LinkedIn
      </a>
    </article>
  );
}