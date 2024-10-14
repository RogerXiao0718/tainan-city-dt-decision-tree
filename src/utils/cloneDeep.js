export default function cloneDeep(target) {
    return JSON.parse(JSON.stringify(target))
}