import Skill from './skill.model';

const DEFAULT_SKILL_LEVEL = 1;

export default {
    /**
     * Create new skill
     * @name create
     * @param {String} name 
     * @param {Number} level 
     */
    create(name, level = 1) {
        level = level || DEFAULT_SKILL_LEVEL;

        const skill = new Skill({ name, level });

        return skill.save();
    },
    /**
     * Filter skills by name and return skills collection
     * @name filter
     * @param {String} name 
     */
    filter(name) {
        const regex = new RegExp(`^${name}`, 'i');

        return Skill.find({ name: { $regex: regex } });
    }
}