type ButtonProps = {
  title: string;
  link: string;
};

export type Props = {
  title: string;
  description: string;
  imgUrl: string;
  cta?: ButtonProps;
};
