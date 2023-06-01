import { Fragment } from "react";

function Cross() {
  return (
    <Fragment>
      <div className="cross rotate-45"></div>
      <div className="cross animation-delay -rotate-45"></div>
    </Fragment>
  );
}

export default Cross;
