const axios = require('axios');

class LocalizationController {
  async getAddressByCEP(cep) {
    try {
      const resp = await axios({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        method: 'get',
      }).then(response => {
        return response;
      });

      return resp.data;
    } catch (error) {
      return error;
    }
  }

  async getAddressByCoord({ request }) {
    try {
      const { lat, long } = request.only(['lat', 'long']);

      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.KEY_LOCATION}`;

      const req = await axios({
        url,
        method: 'get',
      }).then(response => {
        return response;
      });

      const address = {
        street: req.data.results[0].address_components[1].long_name,
        district: req.data.results[0].address_components[2].long_name,
        city: req.data.results[0].address_components[3].long_name,
        state: req.data.results[0].address_components[4].long_name,
        country: req.data.results[0].address_components[5].long_name,
        cep: req.data.results[0].address_components[6].long_name,
      };

      return address;
    } catch (error) {
      return error;
    }
  }
}

module.exports = LocalizationController;
