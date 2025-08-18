import React, { useRef } from "react";
import { WebView } from "react-native-webview";

export default function TawkToChatForClient({
  name,
  email,
  role,
  phone,
  avatar,
  onLoadEnd,
}) {
  const webviewRef = useRef(null);

  // Enhanced JS to set visitor attributes with better error handling and debugging
  const setVisitorJS = `
    (function() {
    
      
      const setAttributes = () => {
        if (window.Tawk_API && window.Tawk_API.setAttributes) {
          const attributes = {
            name: "${name || ""}",
            email: "${email || ""}",
            phone: "${phone || ""}",
            avatar: "${avatar || ""}",
            role: "${role || ""}"
          };
          
         
          
          window.Tawk_API.setAttributes(attributes, function(error) {
            if (error) {
             
            } else {
             
            }
          });
          
          // Also try setting visitor info (alternative method)
          if (window.Tawk_API.setVisitor) {
            window.Tawk_API.setVisitor({
              name: "${name || ""}",
              email: "${email || ""}",
              phone: "${phone || ""}",
              avatar: "${avatar || ""}",
              role: "${role || ""}"
            }, function(error) {
              if (error) {
               
              } else {
               
              }
            });
          }
        } else {
         
          setTimeout(setAttributes, 1000);
        }
      };
      
      // Try setting attributes immediately and also after a delay
      setAttributes();
      setTimeout(setAttributes, 2000);
      setTimeout(setAttributes, 5000);
    })();
    
    true;
  `;

  // Handle WebView load completion
  const handleLoadEnd = () => {
    // Inject the JavaScript after a small delay to ensure page is fully loaded
    setTimeout(() => {
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(setVisitorJS);
      }
    }, 1000);

    // Call parent's onLoadEnd if provided
    if (onLoadEnd) {
      onLoadEnd();
    }
  };

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: "https://tawk.to/chat/6897755cc609941924c6f8e3/1j27q4tuf",
      }}
      onLoadEnd={handleLoadEnd}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      mixedContentMode="compatibility"
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
      }}
    />
  );
}
