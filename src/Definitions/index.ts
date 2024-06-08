import { Deliveries } from "./Deliveries";
import { Motoboy } from "./Motoboy";
import { User } from "./User";
import { Company } from "./Company";
import { Status } from "./Status";
import { Collaborator } from "./Colaborador";
import { UserTypePermissions } from "./UserTypePermissions";
import { Permissions } from "./Permissions";
import { DeliveryFee } from "./DeliveryFee";
import { PaymentMethod } from "./PaymentMethod";

Deliveries.belongsTo(Status, { foreignKey: 'statusId' , as: 'deliveriesStatus'})
Status.hasMany(Deliveries,{foreignKey: 'statusId', as: 'deliveriesStatus'})

Motoboy.belongsTo(Company,{foreignKey:'empresaId', as: 'motoboyCompany'})
Company.hasMany(Motoboy,{foreignKey:'empresaId', as: 'motoboyCompany'})

Collaborator.belongsTo(Company, {foreignKey: 'empresaId', as: 'collaboratorCompany'})
Company.hasMany(Collaborator, {foreignKey: 'empresaId', as: 'collaboratorCompany'})

UserTypePermissions.belongsTo(Permissions, { foreignKey:'permissaoId', as: 'permissions'})
Permissions.hasMany(UserTypePermissions, { foreignKey:'permissaoId', as: 'permissions'})

Deliveries.belongsTo(Motoboy,{foreignKey: 'motoboyId', as:'motoboy'})
Motoboy.hasMany(Deliveries, {foreignKey: 'motoboyId', as: 'motoboy'})

Motoboy.belongsTo(User,{ foreignKey:'usuarioId', as: 'usuario'})
User.hasMany(Motoboy,{ foreignKey:'usuarioId', as: 'usuario'})

Collaborator.belongsTo(User, { foreignKey:'usuarioId', as: 'usuarioColaborador'})
User.hasMany(Collaborator,{ foreignKey:'usuarioId', as: 'usuarioColaborador'})

Deliveries.belongsTo(DeliveryFee,{foreignKey: 'taxaEntregaId', as: 'taxaEntrega'})
DeliveryFee.hasMany(Deliveries,{foreignKey: 'taxaEntregaId', as: 'taxaEntrega'})

Deliveries.belongsTo(PaymentMethod, {foreignKey: 'metodoPagamentoId', as: 'metodoPagamento'})
PaymentMethod.hasMany(Deliveries,{foreignKey: 'metodoPagamentoId', as: 'metodoPagamento'})

export { Deliveries, Status, Motoboy, Company, User, Collaborator, UserTypePermissions, Permissions, DeliveryFee, PaymentMethod}
