type ParentProps = {
  children: React.ReactNode; // Tipagem do children
};

const Navbar = ({ children }: ParentProps) => {
  return (
    <nav>
      <div className="bg-blue-500 h-auto flex flex-row px-4">
        {children}
      </div>
    </nav>
  );
};

export default Navbar;
