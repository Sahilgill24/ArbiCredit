import styles from "./ui.module.css";

type AnimatedGradientTextProps = {
  from?: string;
  via?: string;
  to?: string;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedGradientText(props: AnimatedGradientTextProps) {
  const from = props.from || 'from-primary-foreground';
  const via = props.via || 'via-primary';
  const to = props.to || 'to-amber-500';

return (
    <>
      <span
        className={`bg-gradient-to-r font-black ${from} ${via} ${to} text-transparent bg-clip-text ${styles.animate_gradient} ${props.className}`}
      >
        {props.children}
      </span>
    </>
  );
}