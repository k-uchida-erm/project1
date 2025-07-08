import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

const useDevice = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200
  });

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // ユーザーエージェントベースのモバイル判定
      const mobilePattern = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileUA = mobilePattern.test(userAgent);
      
      // 画面幅ベースの判定
      const isMobileWidth = width <= 768;
      const isTabletWidth = width > 768 && width <= 1024;
      
      // 最終的な判定（モバイルは幅とUAの両方を考慮）
      const isMobile = isMobileWidth || isMobileUA;
      const isTablet = !isMobile && isTabletWidth;
      const isDesktop = !isMobile && !isTablet;
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width
      });
    };

    // 初期検出
    detectDevice();

    // リサイズイベントリスナー
    window.addEventListener('resize', detectDevice);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  return deviceInfo;
};

export default useDevice; 