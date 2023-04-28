"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AbstractService = class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll(relations = []) {
        return await this.repository.find({ relations });
    }
    async create(data) {
        await this.repository.save(data);
        return await this.repository.findOne({ where: data });
    }
    async findOne(data, relations = []) {
        return this.repository.findOne({ where: data, relations });
    }
    async update(id, data) {
        return await this.repository.update(id, data);
    }
    async delete(id) {
        return await this.repository.delete(id);
    }
    async paginate(page = 1, relations = []) {
        const take = 2;
        const [result, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });
        return {
            data: result,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / take)
            }
        };
    }
};
AbstractService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AbstractService);
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map