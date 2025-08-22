interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`border-t bg-background py-6 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Copyright Creaton Studio
        </p>
      </div>
    </footer>
  );
};