import { cn } from '../utils/tw';

type Props = React.ComponentPropsWithoutRef<'div'>;

export default function Container({ className, children, ...props }: Props) {
  return (
    <div className={cn('container mx-auto max-w-6xl', className)} {...props}>
      {children}
    </div>
  );
}
