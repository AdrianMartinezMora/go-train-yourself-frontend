export default interface Menu{
    name: string;
    link?: string;
    visible: boolean;
    children?: Menu[];
}