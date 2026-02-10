import React from 'react';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="glass-panel w-full max-w-4xl min-h-[80vh] sm:min-h-[600px] rounded-2xl overflow-hidden flex flex-col relative my-4">
                {/* Background decorative elements */}
                <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-[var(--color-neon-blue)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-[var(--color-neon-purple)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};
