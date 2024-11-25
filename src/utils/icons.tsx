import React from "react";

type Props = React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>;

export const MoonIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1.2em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1.2em"
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1.5em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1.5em"
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const EditIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

export const DeleteIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const EyeIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const Lock = ({ fill, size, height, width, ...props }) => {
  const color = fill;

  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(3.85 0.75)"
        />
        <path
          d="M.5,0V2.221"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(7.91 12.156)"
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(0.75 6.824)"
        />
      </g>
    </svg>
  );
};

export const Activity = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

export const Flash = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Server = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const TagUser = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Scale = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const SelectorIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M8 9l4 -4l4 4" />
    <path d="M16 15l-4 4l-4 -4" />
  </svg>
);

export const LightTheme = () => {
  return (
    <svg
      fill="none"
      height="117"
      viewBox="0 0 240 117"
      width="240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0.5H228C234.351 0.5 239.5 5.64873 239.5 12V116.5H0.5V12C0.5 5.64873 5.64873 0.5 12 0.5Z"
        fill="white"
      ></path>
      <path
        d="M12 0.5H228C234.351 0.5 239.5 5.64873 239.5 12V116.5H0.5V12C0.5 5.64873 5.64873 0.5 12 0.5Z"
        stroke="#E4E4E7"
      ></path>
      <path
        d="M32 48.5C32 45.4624 34.4624 43 37.5 43H67.5C70.5376 43 73 45.4624 73 48.5V48.5C73 51.5376 70.5376 54 67.5 54H37.5C34.4624 54 32 51.5376 32 48.5V48.5Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M17 105C17 101.686 19.6863 99 23 99H67C70.3137 99 73 101.686 73 105V105C73 108.314 70.3137 111 67 111H23C19.6863 111 17 108.314 17 105V105Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M88 25.5C88 22.4624 90.4624 20 93.5 20H207.5C210.538 20 213 22.4624 213 25.5V25.5C213 28.5376 210.538 31 207.5 31H93.5C90.4624 31 88 28.5376 88 25.5V25.5Z"
        fill="#E4E4E7"
      ></path>
      <path
        d="M88 105C88 101.686 90.6863 99 94 99H189C192.314 99 195 101.686 195 105V105C195 108.314 192.314 111 189 111H94C90.6863 111 88 108.314 88 105V105Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M88 51C88 46.5817 91.5817 43 96 43H221C225.418 43 229 46.5817 229 51V85C229 89.4183 225.418 93 221 93H96C91.5817 93 88 89.4183 88 85V51Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M17 48.5C17 45.4624 19.4624 43 22.5 43V43C25.5376 43 28 45.4624 28 48.5V48.5C28 51.5376 25.5376 54 22.5 54V54C19.4624 54 17 51.5376 17 48.5V48.5Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M17 66.5C17 63.4624 19.4624 61 22.5 61V61C25.5376 61 28 63.4624 28 66.5V66.5C28 69.5376 25.5376 72 22.5 72V72C19.4624 72 17 69.5376 17 66.5V66.5Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M17 86.5C17 83.4624 19.4624 81 22.5 81V81C25.5376 81 28 83.4624 28 86.5V87.5C28 90.5376 25.5376 93 22.5 93V93C19.4624 93 17 90.5376 17 87.5V86.5Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M32 25.5C32 22.4624 34.4624 20 37.5 20H67.5C70.5376 20 73 22.4624 73 25.5V25.5C73 28.5376 70.5376 31 67.5 31H37.5C34.4624 31 32 28.5376 32 25.5V25.5Z"
        fill="#E4E4E7"
      ></path>
      <path
        d="M32 66.5C32 63.4624 34.4624 61 37.5 61H67.5C70.5376 61 73 63.4624 73 66.5V66.5C73 69.5376 70.5376 72 67.5 72H37.5C34.4624 72 32 69.5376 32 66.5V66.5Z"
        fill="#F4F4F5"
      ></path>
      <path
        d="M32 87C32 83.6863 34.6863 81 38 81H67C70.3137 81 73 83.6863 73 87V87C73 90.3137 70.3137 93 67 93H38C34.6863 93 32 90.3137 32 87V87Z"
        fill="#F4F4F5"
      ></path>
      <circle cx="22.5" cy="25.5" fill="#E4E4E7" r="5.5"></circle>
    </svg>
  );
};

export const DarkTheme = () => {
  return (
    <svg
      fill="none"
      height="117"
      viewBox="0 0 240 117"
      width="240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0.5H228C234.351 0.5 239.5 5.64873 239.5 12V116.5H0.5V12C0.5 5.64873 5.64873 0.5 12 0.5Z"
        fill="black"
      ></path>
      <path
        d="M12 0.5H228C234.351 0.5 239.5 5.64873 239.5 12V116.5H0.5V12C0.5 5.64873 5.64873 0.5 12 0.5Z"
        stroke="#3F3F46"
      ></path>
      <path
        d="M32 48.5C32 45.4624 34.4624 43 37.5 43H67.5C70.5376 43 73 45.4624 73 48.5V48.5C73 51.5376 70.5376 54 67.5 54H37.5C34.4624 54 32 51.5376 32 48.5V48.5Z"
        fill="#27272A"
      ></path>
      <path
        d="M17 105C17 101.686 19.6863 99 23 99H67C70.3137 99 73 101.686 73 105V105C73 108.314 70.3137 111 67 111H23C19.6863 111 17 108.314 17 105V105Z"
        fill="#27272A"
      ></path>
      <path
        d="M88 25.5C88 22.4624 90.4624 20 93.5 20H207.5C210.538 20 213 22.4624 213 25.5V25.5C213 28.5376 210.538 31 207.5 31H93.5C90.4624 31 88 28.5376 88 25.5V25.5Z"
        fill="#3F3F46"
      ></path>
      <path
        d="M88 105C88 101.686 90.6863 99 94 99H189C192.314 99 195 101.686 195 105V105C195 108.314 192.314 111 189 111H94C90.6863 111 88 108.314 88 105V105Z"
        fill="#27272A"
      ></path>
      <path
        d="M88 51C88 46.5817 91.5817 43 96 43H221C225.418 43 229 46.5817 229 51V85C229 89.4183 225.418 93 221 93H96C91.5817 93 88 89.4183 88 85V51Z"
        fill="#27272A"
      ></path>
      <path
        d="M17 48.5C17 45.4624 19.4624 43 22.5 43V43C25.5376 43 28 45.4624 28 48.5V48.5C28 51.5376 25.5376 54 22.5 54V54C19.4624 54 17 51.5376 17 48.5V48.5Z"
        fill="#27272A"
      ></path>
      <path
        d="M17 66.5C17 63.4624 19.4624 61 22.5 61V61C25.5376 61 28 63.4624 28 66.5V66.5C28 69.5376 25.5376 72 22.5 72V72C19.4624 72 17 69.5376 17 66.5V66.5Z"
        fill="#27272A"
      ></path>
      <path
        d="M17 86.5C17 83.4624 19.4624 81 22.5 81V81C25.5376 81 28 83.4624 28 86.5V87.5C28 90.5376 25.5376 93 22.5 93V93C19.4624 93 17 90.5376 17 87.5V86.5Z"
        fill="#27272A"
      ></path>
      <path
        d="M32 25.5C32 22.4624 34.4624 20 37.5 20H67.5C70.5376 20 73 22.4624 73 25.5V25.5C73 28.5376 70.5376 31 67.5 31H37.5C34.4624 31 32 28.5376 32 25.5V25.5Z"
        fill="#3F3F46"
      ></path>
      <path
        d="M32 66.5C32 63.4624 34.4624 61 37.5 61H67.5C70.5376 61 73 63.4624 73 66.5V66.5C73 69.5376 70.5376 72 67.5 72H37.5C34.4624 72 32 69.5376 32 66.5V66.5Z"
        fill="#27272A"
      ></path>
      <path
        d="M32 87C32 83.6863 34.6863 81 38 81H67C70.3137 81 73 83.6863 73 87V87C73 90.3137 70.3137 93 67 93H38C34.6863 93 32 90.3137 32 87V87Z"
        fill="#27272A"
      ></path>
      <circle cx="22.5" cy="25.5" fill="#3F3F46" r="5.5"></circle>
    </svg>
  );
};
