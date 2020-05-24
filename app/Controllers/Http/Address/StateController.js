const State = use('App/Models/Address/State');

class StateController {
  async index() {
    const states = await State.all();

    return states;
  }

  async store({ request, auth }) {
    await auth.check();

    const data = request.only(['name', 'country_id']);

    const state = await State.create(data);

    return { success: 'Estado cadastrado com sucesso', state };
  }

  async show({ params }) {
    const state = await State.findOrFail(params.id);

    return state;
  }

  async update({ params, request, auth }) {
    await auth.check();

    const state = await State.findOrFail(params.id);

    const data = request.only(['name', 'country_id']);

    state.merge(data);

    await state.save();

    return state;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const state = await State.findOrFail(params.id);

    await state.delete();
  }
}

module.exports = StateController;
