export const TodoPanel = () => {
  return (
    <div className="w-full h-fit border border-white-primary rounded-3xl p-10 flex items-center justify-evenly gap-x-4 mb-6">
      <div className="flex flex-col">
        <span className="text-2xl text-white-primary font-bold">
          Todo Feito
        </span>

        <span className="text-lg text-white-primary font-normal tracking-widest">
          Não desista
        </span>
      </div>

      <div className="w-24 h-24">
        <div className="w-full h-full bg-orange-primary rounded-full flex items-center justify-center">
          <span className="text-3xl text-gray-primary font-bold tracking-widest">
            1/3
          </span>
        </div>
      </div>
    </div>
  );
};
