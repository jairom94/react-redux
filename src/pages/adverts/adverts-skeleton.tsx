import { useEffect, useState } from 'react';

const AdvertsSkeleton = () => {    
    const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
    const isMobile = sizeWindow < 640;
    const isTablet = sizeWindow >= 640 && sizeWindow < 1024;    
    const itemsPerRow = isMobile ? 1 : isTablet ? 2 : 3;
    const skeletonItems = Array.from({ length: itemsPerRow * 4 }, (_, index) => index + 1);
    // console.log(skeletonItems);
    
    useEffect(()=>{
        const handleResize = () => {
            setSizeWindow(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])
    return (
        <>
        {skeletonItems.map((item) => (
            <div key={item} className="card">
                <div className="min-h-[200px] rounded-2xl shadow bg-gray-50 card-skeleton"></div>
                <p className="min-h-[20px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
                <p className="min-h-[20px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            </div>
        ))}
        </>
    );
};

export default AdvertsSkeleton;