const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default BaseContainer;
