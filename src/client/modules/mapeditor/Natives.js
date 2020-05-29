const __GameVersion__ = 2;

const __Natives__ = {
    SET_ENTITY_ALPHA: ['x44A0870B7E92D7C0'],
    RESET_ENTITY_ALPHA: ['0x9B1E824FFBB7027A'],
    GET_ENTITY_MODEL: ['0x9F47B058362C84B5']
};

const proxyNatives = new Proxy(__Natives__, {
    get: (target, name, receiver) => __Natives__[name][__GameVersion__]
});
exports = proxyNatives;