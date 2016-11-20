axios.railsPost = function(url, data) {
  return axios._action('POST', url, data);
}

axios.railsPatch = function(url, data) {
  return axios._action('PATCH', url, data);
}

axios._action = function(verb, url, data) {
  return axios({
    method: verb,
    url: url,
    data: data,
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').attributes["content"].value
    }
  });
}
