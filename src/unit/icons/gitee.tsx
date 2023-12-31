import { Fragment } from "react";
import "./icon.css";

function GiteeIcon(props: { onClick?: () => void }) {
  return (
    <Fragment>
      <svg
        className="gitee-icon"
        onClick={props.onClick}
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        fill="#888888"
      >
        <path
          d="M18.815 0c10.392 0 18.816 8.424 18.816 18.815 0 10.392-8.424 18.816-18.816 18.816C8.424 37.63 0 29.207 0 18.815 0 8.424 8.424 0 18.815 0zm9.524 8.363H15.331a6.969 6.969 0 0 0-6.969 6.969v13.007c0 .513.416.93.93.93h13.705a6.272 6.272 0 0 0 6.271-6.272v-5.343a.93.93 0 0 0-.929-.929H17.654a.93.93 0 0 0-.93.93v2.322c0 .477.358.87.82.923l.109.006h6.505a.93.93 0 0 1 .923.82l.006.11v.464a2.787 2.787 0 0 1-2.787 2.787h-8.828a.93.93 0 0 1-.929-.929v-8.827a2.787 2.787 0 0 1 2.617-2.782l.17-.005h13.007a.93.93 0 0 0 .93-.93V9.293a.928.928 0 0 0-.819-.923l-.109-.006z"
          fillRule="evenodd"
        />
      </svg>
    </Fragment>
  );
}

export default GiteeIcon;
