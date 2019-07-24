Object.assign(pc, function () {

    var TemplateUtils = {
        /**
         * @private
         * @function
         * @name pc.TemplateUtils#waitForTemplatesInScene
         * @description Delay execution of the callback until collapsedInstances
         * are expanded (if present). For expansion we need to wait for template assets
         * to load.
         * @param {Object} data Raw scene data from the database
         * @param {pc.AssetRegistry} assets The application's asset registry
         * @param {Function} callback The callback to execute after template assets are loaded.
         */
        waitForTemplatesInScene: function (data, assets, callback) {
            if (data.collapsedInstances) {
                var entities = pc.TemplateUtils._getAllCollapsedEntities(data);

                pc.TemplateUtils.waitForTemplateAssets(
                    entities,
                    assets,
                    callback,
                    data);
            } else {
                callback(null, response);
            }
        },

        waitForTemplateAssets: function (entities, assets, callback, response) {
            var templateIds = pc.TemplateUtils._extractTemplateIds(entities);

            var loader = new pc.AssetListLoader(templateIds, assets);

            loader.load(function (err) {
                callback(err, response);
            });
        },

        _getAllCollapsedEntities: function (data) {
            var entities = {};

            data.collapsedInstances.forEach(function (h) {
                Object.assign(entities, h.instanceEntities);
            });

            return entities;
        },

        _extractTemplateIds: function (entities) {
            var templateIds = [];

            for (var guid in entities) {
                var id = entities[guid].template_id;

                if (id) {
                    templateIds.push(id);
                }
            }

            return templateIds;
        },

        expandTemplateEntities: function (app, entities) {
            var result = {};

            for (var guid in entities) {
                var h = entities[guid];

                result[guid] = h.collapsed_entity ?
                    pc.TemplateUtils.expandEntity(app, h) : h;
            }

            return result;
        },

        expandEntity: function (app, data) {
            // todo implement this
        }
    };

    return {
        TemplateUtils: TemplateUtils
    };
}());
