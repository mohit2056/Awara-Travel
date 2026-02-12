import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="Container">
      { (offlineReady || needRefresh) && (
        <div className="fixed bottom-5 right-5 p-4 bg-gray-800 border border-purple-500 rounded-lg shadow-2xl z-50 flex flex-col gap-2 max-w-sm animate-bounce-in">
          <div className="text-white font-semibold">
            {offlineReady
              ? "App ready to work offline! 🚀"
              : "New update available! Click reload to update. 🔄"}
          </div>
          <div className="flex gap-2 mt-2">
            {needRefresh && (
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm font-bold transition"
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            )}
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded text-sm transition"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReloadPrompt;