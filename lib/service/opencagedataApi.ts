import axios from 'axios';

interface GetUserInfoParams {
 latitude: number;
 longitude: number 
}

interface Result {
 annotations:{
  currency: {
    iso_code: string
  }
 }
}
interface Results {
  results: Result []
}


export const getUserInfo = async ({ latitude, longitude } : GetUserInfoParams) : Promise<Results> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  // results[0].annotations.currency.iso_code

  const { data } = await axios.get<Results>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
