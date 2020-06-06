import get from '../restService';

const certificationMapper = (item) => {
  const movieCertification = item.release_dates.find((release) => release.type === 3);
  const certification = movieCertification ? movieCertification.certification : '';
  return {
    countryCode: item.iso_3166_1,
    certification,
  };
};

const certificationBuilder = async (url) => {
  const data = await get(url);
  const { results } = data;
  const mapped = results.map((item) => certificationMapper(item));
  return mapped.filter((item) => item.certification !== '');
};

export default certificationBuilder;
