/**
 * Принимает в себя два аргумента, один из них принимает объект, второй строку с названием
 * дескриптора. Должно вернуть массив строк, которыми являются ключи объекта соответствующие
 * дескриптору. То есть если у нас есть два свойства у которых writable true(если мы передали арг
 * writable) то возвращает массив со строками-названиями этих свойств. Смотрите пример в check.js
 * @param {Object} object
 * @param {'writable' | 'enumerable' | 'configurable'} descriptor
 *
 * @returns string[]
 */
export const getKeysByDescriptor = (object, descriptor) => {
  let descriptedObject = Object.getOwnPropertyDescriptors(object);
  let result = [];
  for (let prop in descriptedObject) {
    for (let subProp in descriptedObject[prop]) {
      if (subProp === descriptor && descriptedObject[prop][subProp] === true) {
        result.push(String(prop));
      }
    }
  }
  return result;
};

/**
 * Должен вернуть true если объект был заморожен каким-либо методом заморозки freeze, seal, preventExtensions иначе false
 * @param {Object} object
 * @returns {boolean}
 */
export const isObjectAnyFrozen = (object) => {
  if (
    Object.isFrozen(object) ||
    Object.isSealed(object) ||
    !Object.isExtensible(object)
  )
    return `true`;
  return `false`;
};

/**
 * Принимает объект и строку. Мы должны вернуть НОВЫЙ объект(копию оригинального), в котором
 * название свойства (мы передали вторым аргументом), будет поставлено во writable false(только
 * нельзя перезаписывать, все остальное можно). Если свойство было в объекте, то мы ставим его значение
 * если не было ставим в значение null
 * @param {Object} object
 * @param {string} propertyName
 *
 * @returns {Object}
 */
export const assignLockedValues = (object, propertyName) => {
  let clone = Object.assign({}, object);
  for (let i in object) {
    if (i === propertyName)
      Object.defineProperty(clone, propertyName, {
        writable: false,
        enumerable: true,
        configurable: true,
      });
    clone[propertyName] = "null";
  }
  return clone;
};

/**
 * Принимает объект и возвращает его копию, только абсолютно замороженную
 * Нельзя удалять свойства, добавлять и редактировать
 * @param {Object} object
 * @returns {Object}
 */
export const freezeAllInObject = (object) => {
  let clone = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(object)
  );
  Object.freeze(clone);
  return clone;
};
 