import * as React from "react";

export const EmailTemplate = ({ firstName }) => (
  <div>
    <p>
      Hey {firstName},
      <br />
      <br />
      My name is Thomas — I'm the creator of Fronteer.
      <br />
      <br />
      I'm starting Fronteer because I struggle to prepare for Frontend
      interviews. Just having a simple and effective process that{" "}
      <i>just works</i>.
      <br />
      <br />
      <b>PS: Why did you sign up? What brought you here?</b>
      <br />
      <br />
      Hit "Reply" and let me know. I read and reply to every email.
      <br />
      <br />
      Take care,
      <br />
      Thomas
    </p>
  </div>
);
