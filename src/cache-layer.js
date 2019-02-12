export default class Cache {
  constructor(){
    this.reset()
  }

  reset(){
    this.calls = []
  }

  record(path, res){
    this.calls.push({
      time: Date.now(),
      path,
      res,
    })
  }

  find(path, threshold = 60000){
    let calls = this.calls.filter(c => c.path === path)
    calls = calls.filter(s => s.time > Date.now() - threshold)
    calls = calls.sort((a,b) => a.time < b.time)
    if (calls.length > 0) return calls[0]
    return null
  }
}
