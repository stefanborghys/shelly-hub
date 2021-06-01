const ModelService = require('../../../src/js/service/modelService');
const Model = require('../../../src/js/model/model');

describe('ModelService', () => {
  describe('findModel', () => {
    test('A model can be found by identifier', async () => {
      const identifier = 'SHIX3-1';
      const model = ModelService.findModel(identifier);

      expect(model).toEqual(Model.of(identifier));
    });

    test('Searching a model by an unknown identifier returns undefined', async () => {
      expect(ModelService.findModel('test')).toBeUndefined();
    });
  });
});
