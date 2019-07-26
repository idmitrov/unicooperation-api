import Skill from './skill.model';

const DEFAULT_SKILL_LEVEL = 1;
const DEFAULT_PAGING_LIMIT = 10;

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
    filter(name, limit) {
        if (!name) {
            return Promise.resolve([]);
        }

        const regex = new RegExp(`^${name}`, 'i');
        
        limit = limit || DEFAULT_PAGING_LIMIT;

        return Skill
            .find({ name: { $regex: regex } })
            .limit(limit);
    }
}