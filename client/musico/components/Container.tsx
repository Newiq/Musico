import React, { ReactNode } from 'react';

interface MainContainerProps {
children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
return (
<div className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
    {children}
</div>
);
};

export default MainContainer;
