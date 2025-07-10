import { useState, useRef, useEffect, useCallback } from 'react';
import { UsePanelStateReturn } from '../types/hooks';

export const usePanelState = (): UsePanelStateReturn => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [inputHeight, setInputHeight] = useState(80); // デフォルト値
  const inputRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [leftPanelRect, setLeftPanelRect] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.offsetHeight);
    }
  }, []);

  const updateInputHeight = useCallback(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const updateRect = () => {
      if (leftPanelRef.current) {
        const rect = leftPanelRef.current.getBoundingClientRect();
        setLeftPanelRect({ left: rect.left, width: rect.width });
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [rightPanelVisible]);

  const handleMenuClick = () => setMobileMenuVisible(true);
  const handleMobileMenuClose = () => setMobileMenuVisible(false);
  const toggleRightPanel = () => setRightPanelVisible(v => !v);

  return {
    sidebarExpanded,
    setSidebarExpanded,
    mobileMenuVisible,
    setMobileMenuVisible,
    rightPanelVisible,
    setRightPanelVisible,
    inputHeight,
    setInputHeight,
    inputRef,
    leftPanelRef,
    leftPanelRect,
    setLeftPanelRect,
    updateInputHeight,
    handleMenuClick,
    handleMobileMenuClose,
    toggleRightPanel,
  };
}; 