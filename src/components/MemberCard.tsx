import * as React from "react";
import type { Member } from "../types/member";

type MemberCardProps = { member: Member };

export function MemberCard({ member }: MemberCardProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article className="border items-center text-center w-50 h-50"
      data-member-id={member.id}>
      <img src={imgError ? "/images/members/Y.jpg" : member.photoUrl}
        alt={`${member.name} headshot`}
        onError={() => setImgError(true)}
        loading="lazy"
        className="object-cover justify-center"/>

      <h3 className="text-lg font-semibold">{member.name}</h3>

      <a href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-blue-600 hover:underline">
        LinkedIn
      </a>
    </article>
  );
}