

export class ObjectPooling
{
    constructor(poolSize)
    {
        this.objType = objType;
        this.poolSize = poolSize;
        this.context = context;
        this.pool = [];
        this.init();
    }
     
    init()
    {
        for(let i = 0 ; i< poolSize;i++)
        {
            this.pool.push(new objType());
        }
    }
    get()
    {
        if(this.pool.length > 0)
        {
            let object = this.pool.pop();
            this.activeObjs.add(object);
            return object;
        }
        else
        {
            let newObj = new this.objType();
            this.activeObjs.add(newObj);
            return newObj;
        }
    }

    deSpawn(object)
    {
        if (this.activeObjs.has(object)) {
            object.reset();
            this.activeObjs.delete(object);
            this.pool.push(object);
        }
    }

    clear()
    {
        this.activeObjs.forEach(object => {
          this.deSpawn(object);
        });
    }
}