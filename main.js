const twitchClientId = 'loyn0o9mugg1vn6fjtc5n7r7tpaorr'; // Twitch API istekleri için gerekli olan istemci kimliği
const twitchSecretKey = 'nl5hmmb27rgn53ji51jwqtnfsrx4o5'; // Twitch API istekleri için gerekli olan gizli anahtar

const channels = ['grimnax', 'fjorgy', 'zade', 'pandorrina', 'aqelyy', 'nevillyn', 'zirgunn', 'neocastro', 'evoneeb', 'theteddyybear', 'imbusymom', 'gorkemguney_', 'teasy', 'desco', 'raufbaba25', 'chyrozen', 'nudgemania', 'carl4', 'solstaf1r', 'tengigabit', 'n1ach', 'th4oden', 'miuthy', 'lunaponcik', 'sinanovicanes', 'bfly0', 'eisthra', 'chysro', 'lordtoro', 'blackion_tv', 'toolerans', 'crusherftw', 'legatusleman', 'protutii', 'canko', 'kiymalidanonee', 'mulayimst', 'vudine', 'siryakup', 'heroglif', 'glopax', 'mosskauu', 'ttyqa', 'buanaz', 'oykeli', 'lyokob', 'denizcankap', 'smookie', 'timuty_', 'pizzavenk', 'p0aca', 'dylannis', 'frostyggwp', 'mikokondri', 'volentes', 'pesimistyle', 'liftof', 'grofsprit', 'kabrockie', 'efeberkss_', 'aysolita', 'tenexar', 'mrevorz', 'makeapoint', 'lasstshot', 'lmunchies', 'thxgod', 'nejlasude', 'videoyun']; // Takip edilecek yayıncılar

async function getStreams() {
  const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channels.join('&user_login=')}`, {
    headers: {
      'Client-ID': twitchClientId,
      'Authorization': `Bearer ${await getAccessToken()}`
    }
  });
  const data = await response.json();
  return data.data;
  
}

async function getAccessToken() {
  const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretKey}&grant_type=client_credentials`, {
    method: 'POST'
  });
  const data = await response.json();
  return data.access_token;
}

async function getProfileImageUrl(userId) {
  const response = await fetch(`https://api.twitch.tv/helix/users?id=${userId}`, {
    headers: {
      'Client-ID': twitchClientId,
      'Authorization': `Bearer ${await getAccessToken()}`
    }
  });
  const data = await response.json();
  return data.data[0].profile_image_url;
}

let shownUsernames = [];

async function refreshContent() {
  const streams = await getStreams();
  let content = '';
  
  for (const stream of streams) {
    if (!shownUsernames.includes(stream.user_name)) {
      const profileImageUrl = await getProfileImageUrl(stream.user_id);
      content += `
        <tr>
          <td class="isim tooltip">
           <img src="${profileImageUrl}" class="avatar" width="32" height="32">
            <a href="https://www.twitch.tv/${stream.user_name}" target="_blank" rel="noopener noreferrer">${stream.user_name}</a><span class="tooltiptexttitle" >${stream.title}</span>
          </td>
          <td class="acik tooltip"><a class="acik tooltip" href="https://www.twitch.tv/${stream.user_name}" target="_blank" rel="noopener noreferrer">Çevrimiçi</a><span class="tooltiptext" ><img src="${stream.thumbnail_url.replace('{width}', '310').replace('{height}', '178')}"></span></td>
          <td class="stream-name">${stream.game_name}</td>
          <td class="izleyici-sayi"><div class="row-duzen"><div class="izleyici"></div><p>${stream.viewer_count}</p></div></td>
        </tr>
      `;
      shownUsernames.push(stream.user_name);
    }
  }


  document.getElementById('yenile').innerHTML = content;
  document.getElementById('yayinci-sayisi').innerText = streams.length;
}

refreshContent();
setInterval('window.location.reload()', 6000000); // Her 1 dakikada bir yenile



var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
          callback(null, xhr.response);
      } else {
          callback(status, xhr.response);
      }
  }
  ;
  xhr.send();
};
getJSON('https://servers-frontend.fivem.net/api/servers/single/5zqb96', function(err, data) {
  document.getElementById("oyuncuSayisi").innerHTML = "Sunucuda " + "\""+ (data.Data.clients) + "\"" + " oyuncu çevrimiçi";
});
