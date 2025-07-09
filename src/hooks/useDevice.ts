import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  hasTouch: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

const useDevice = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    hasTouch: false,
    deviceType: 'desktop'
  });

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // UserAgent判定（画面幅は使用しない）
      const mobilePattern = /android.*mobile|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
      const tabletPattern = /ipad|android(?!.*mobile)|tablet|kindle|silk/i;
      const isMobileUA = mobilePattern.test(userAgent);
      const isTabletUA = tabletPattern.test(userAgent);
      
      // タッチ機能の検出
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // デバイス種類の判定（画面幅を使わない）
      let isMobile = false;
      let isTablet = false;
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      
      if (isMobileUA) {
        // UserAgentがモバイルパターンにマッチ
        isMobile = true;
        deviceType = 'mobile';
      } else if (isTabletUA) {
        // UserAgentがタブレットパターンにマッチ
        isTablet = true;
        deviceType = 'tablet';
      } else if (hasTouch && !isTabletUA && navigator.userAgent.includes('Mobile')) {
        // タッチ対応でモバイル表記があるが上記に該当しない場合
        isMobile = true;
        deviceType = 'mobile';
      }
      
      const isDesktop = !isMobile && !isTablet;
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        hasTouch,
        deviceType
      });
    };

    // 初期検出
    detectDevice();

    // リサイズイベントリスナー（画面幅情報のみ更新）
    window.addEventListener('resize', detectDevice);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  return deviceInfo;
};

export default useDevice; 