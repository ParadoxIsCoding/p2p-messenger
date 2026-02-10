import React from 'react';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-[var(--color-bg-primary)]">
            <div className="panel w-full max-w-4xl min-h-[80vh] sm:min-h-[600px] rounded-xl overflow-hidden flex flex-col relative my-4">

                <div className="relative z-10 flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};
