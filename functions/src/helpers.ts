import moment from 'moment';

const MOCK_COUNTRIES = [
  'Kazakhstan',
  'Philippines',
  'China',
  'Russia',
  'Philippines',
  'Czech Republic',
  'Georgia',
  'Netherlands',
  'Greece',
  'Poland',
  'China',
  'Poland',
  'Japan',
  'Yemen',
  'Macedonia',
  'Brazil',
  'Poland',
  'Thailand',
  'Sweden',
  'Russia',
  'Brazil',
  'Panama',
  'Dominican Republic',
  'China',
  'Sweden',
  'Sweden',
  'China',
  'Indonesia',
  'Peru',
  'Indonesia',
  'Ukraine',
  'Indonesia',
  'Chile',
  'Mexico',
];
function augmentData(snapshot: any, context: any) {
  const id = context.params.download_id;
  const val = snapshot.val();
  const country = mockCountry(); // Outbound traffic not allowed on free plan, mocking call
  console.log(id, val, country);
  return snapshot.ref.set({ ...val, downloaded_at: moment().unix(), country: country });
}

function mockCountry() {
  const index = Math.round(Math.random() * (MOCK_COUNTRIES.length - 1));
  return MOCK_COUNTRIES[index];
}

export { augmentData };
