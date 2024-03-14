import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => (
  <MutatingDots
    height="100"
    width="100"
    color="#eac645"
    secondaryColor="#1f0592"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{ justifyContent: 'center' }}
    wrapperClass=""
    visible={true}
  />
);
