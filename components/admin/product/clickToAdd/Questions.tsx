import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const Questions = ({ questions, product, setProduct }: any) => {

    const handleQuestions = (i: any, e: any) => {
        const values = [...questions];
        values[i][e.target.name] = e.target.value;
        setProduct({
            ...product,
            questions: values,
        });
    };
    const handleRemove = (i: any) => {
        if (questions.length > 0) {
            const values = [...questions];
            values.splice(i, 1);
            setProduct({
                ...product,
                questions: values,
            });
        }
    };

    return (
        <div>
            <div className="my-2 pb-2 font-semibold border-b">Questions</div>

            {questions.length === 0 ? (
                <PlusCircleIcon
                    className="cursor-pointer w-8 h-8 hover:scale-[1.2] transition"
                    onClick={() =>
                        setProduct({
                            ...product,
                            questions: [
                                ...questions,
                                {
                                    question: "",
                                    answer: "",
                                },
                            ],
                        })
                    }
                />
            ) : (
                ""
            )}

            {questions
                ? questions.map((item: any, i: number) => (
                      <div className="my-5 flex items-center" key={i}>
                          <input
                              type="text"
                              name="question"
                              placeholder="Question"
                              value={item.question}
                              onChange={(e) => handleQuestions(i, e)}
                              className="ml-4 mr-2 border  rounded p-2 w-44  focus:bg-slate-200"
                          />
                          <input
                              type="text"
                              name="answer"
                              placeholder="Answer"
                              value={item.answer}
                              onChange={(e) => handleQuestions(i, e)}
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
                                          questions: [
                                              ...questions,
                                              {
                                                  question: "",
                                                  answer: "",
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

export default Questions;
