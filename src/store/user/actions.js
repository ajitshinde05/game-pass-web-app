import APIService from '@/libs/api/api';

export async function getProfileDetails(ctx) {
  ctx.commit('setUser');
}
export async function fetchRequestPointsBalance({ commit }) {
  const response = await new APIService().api(
    { method: 'GET', url: 'user/requestPointBalance' },
    {},
    {},
  );
  if (response.result.errors) {
    return;
  }

  commit('setRequestPointBalance', response.requestPointBalance);
}
