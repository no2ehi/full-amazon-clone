import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const Details = ({ details, product, setProduct }: any) => {
    const handleDetails = (i: any, e: any) => {
        const values = [...details];
        values[i][e.target.name] = e.target.value;
        setProduct({
            ...product,
            details: values,
        });
    };
    const handleRemove = (i: any) => {
        if (details.length > 0) {
            const values = [...details];
            values.splice(i, 1);
            setProduct({
                ...product,
                details: values,
            });
        }
    };

    return (
        <div>
            <div className="my-2 pb-2 font-semibold border-b">Details</div>

            {details.length == 0 ? (
                <PlusCircleIcon
                    className="cursor-pointer w-8 h-8 hover:scale-[1.2] transition"
                    onClick={() =>
                        setProduct({
                            ...product,
                            details: [
                                ...details,
                                {
                                    name: "",
                                    value: "",
                                },
                            ],
                        })
                    }
                />
            ) : (
                ""
            )}

            {details
                ? details.map((detail: any, i: number) => (
                      <div className="my-5 flex items-center" key={i}>
                          <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={detail.name}
                              onChange={(e) => handleDetails(i, e)}
                              className="ml-4 mr-2 border  rounded p-2 w-44  focus:bg-slate-200"
                          />
                          <input
                              type="text"
                              name="value"
                              placeholder="Value"
                              value={detail.value}
                              onChange={(e) => handleDetails(i, e)}
                              className="ml-4 mr-2 border  rounded p-2 w-44  focus:bg-slate-200"
                          />

                          <div className="flex">
                              <MinusCircleIcon
                                  className="cursor-pointer w-8 h-8 hover:scale-[1.2] transition"
                                  onClick={() => handleRemove(i)}
                              />

                              <PlusCircleIcon
                                  className="cursor-pointer w-8 h-8 hover:scale-[1.2] transition"
                                  onClick={() =>
                                      setProduct({
                                          ...product,
                                          details: [
                                              ...details,
                                              {
                                                  name: "",
                                                  value: "",
                                              },
                                          ],
                                      })
                                  }
                              />
                          </div>
                      </div>
                  ))
                : ""}
        </div>
    );
};

export default Details;
