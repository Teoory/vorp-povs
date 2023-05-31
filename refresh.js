// Yenile düğmesine bir olay dinleyicisi ekleyin
document.getElementById('refresh-button').addEventListener('click', async () => {
  // Tabloyu güncelleyin
  await refreshTable();
});

// Tabloyu güncelleyen bir fonksiyon tanımlayın
async function refreshTable() {
  const streams = await getStreams();
  let content = '';

  for (const stream of streams) {
    const profileImageUrl = await getProfileImageUrl(stream.user_id);

    if (!shownUsernames.includes(stream.user_name)) {
      content += `
        <tr>
          <td class="isim">
            <img src="${profileImageUrl}" class="avatar" width="32" height="32">
            <a href="https://www.twitch.tv/${stream.user_name}" target="_blank" rel="noopener noreferrer">${stream.user_name}</a>
          </td>
          <td class="acik">Çevrimiçi</td>
          <td>${stream.game_name}</td>
          <td class="izleyici-sayi">${stream.viewer_count}</td>
        </tr>
      `;
      shownUsernames.push(stream.user_name);
    }
  }

  // Yeniden yüklenmiş tablo içeriğini yerine koyun
  document.querySelector('tbody').innerHTML = content;
}