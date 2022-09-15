chrome.runtime.onMessage.addListener(data => {
  if (data.type === 'notification') {
    chrome.notifications.create('', data.options);
  }
});

whale.runtime.onMessage.addListener(request => {
  if (request.action === 'openLocalPage') {
      whale.sidebarAction.show({
          url: whale.runtime.getURL('../html/study.html')
      });
  }
});