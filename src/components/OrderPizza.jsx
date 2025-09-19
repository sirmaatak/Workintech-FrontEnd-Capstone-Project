import React, { useEffect, useState } from "react";
import { Button, FormGroup, Label, Input, Row, Col, Form } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPizza = () => {
  const ingredientsList = [
    "Pepperoni",
    "Domates",
    "Biber",
    "Sosis",
    "Misir",
    "Sucuk",
    "Kanada Jambonu",
    "Ananas",
    "Tavuk Izgara",
    "Jalepeno",
    "Kabak",
    "Sogan",
    "Sarimsak",
  ];
  //siparis adetini tutan state
  const [quantity, setQuantity] = useState(1);

  //react hook form kullanarak form verilerine ulasiyorum
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      size: "Küçük", // Başlangıçta Küçük seçili
      dough: "Hamur Kalınlığı", // Başlangıçta Hamur Kalınlığı
      extras: [], // Başlangıçta ekstra malzeme seçilmedi
      note: "", // Başlangıçta sipariş notu boş
      name: "", // Başlangıçta ad soyad boş
    },
  });

  // toplam fiyat bilgisini tuttugum setter
  const [total, setTotal] = useState(85.5);

  //secimleri ,siparis notu ve ad-soyad bilgisini izleyebildigim hook form fonksiyonu
  const watchSize = watch("size", "Küçük");
  const watchDough = watch("dough", "Hamur Kalınlığı");
  const watchExtras = watch("extras", []);
  const watchNote = watch("note", "");
  const watchName = watch("name", "");

  //toplam fiyati hesaplayan fonksiyon
  const calculateTotal = () => {
    let newTotal = 85.5;

    // eklenen ek malzemelerin fiyati hesaplanir ve yeni fiyat hesaplanir
    newTotal += watchExtras.length * 5;
    //toplam fiyati siparis sayisi ile carpilir ve yeni fiyat hesaplanir
    newTotal *= quantity;
    // yeni fiyat setter ile guncellenir
    setTotal(newTotal);
  };

  //form submit edildiginde yapilacaklar
  const onSubmit = (data) => {
    const orderData = {
      ...data,
      quantity,
      total,
    };
    alert("Sipariş Verildi: " + JSON.stringify(orderData, null, 2));
  };
  //siparis adeti degistikce yeni toplam hesaplanir
  const handleQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(1, newQuantity); // 1'den küçükse 1 yap
    setQuantity(validQuantity);
  };

  // useEffect ile boyut,hamur secimi ve ekstra malzeme secildiginde tekrar fiyat hesapliyoruz.
  useEffect(() => {
    calculateTotal();
  }, [watchSize, watchDough, watchExtras, quantity]);

  return (
    <>
      {/* Header */}
      <header className="w-screen bg-red-600 shadow-md">
        <div className="py-6">
          <h1 className="text-center text-white text-3xl font-bold">
            Teknolojik Yemekler
          </h1>
        </div>
        <div className="pb-4">
          <nav className="flex justify-center">
            <ol className="flex flex-wrap space-x-2 text-sm text-white">
              <li>
                <a href="#" className="text-white">
                  Anasayfa
                </a>
              </li>
              <li>-</li>
              <li>
                <a href="#" className="text-white">
                  Seçenekler
                </a>
              </li>
              <li>-</li>
              <li className="font-semibold">Sipariş Oluştur</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* İçerik */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-wrap items-center text-center">
        {/* Başlık ve Fiyat */}
        <div className="justify-center text-center label-left">
          <h5 className="text-xl mt-9">Position Absolute Acı Pizza</h5>
          <p className="mt-8">85.50₺</p>
          <p className="mt-4 label-left" style={{ color: "#5F5F5F" }}>
            FrontEnd Dev olarak hala position:absolute kullaniyorsan bu cok aci
            pizza tam sana gore. Pizza, domates, peynir ve genellikle cesitli
            diger malzemelerle kaplanmis, daha sonra geleneksel olarak odun
            atesinde bir firinda yuksek sicaklikta pisirilen, genellikle
            yuvarlak, duzlestirilmis mayali bugday bazli hamurdan olusan Italyan
            kokenli lezzetli bir yemektir. Kucuk bir pizzaya bazen pizzetta
            denir.
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-12 mt-20">
          {/* Boyut ve Hamur */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center text-center">
            {/* Boyut */}
            <div>
              <label className="block text-lg font-semibold mb-2 label-left">
                Boyut Seç *
              </label>
              <Controller
                control={control}
                name="size"
                rules={{ required: "Lütfen bir boyut seçin" }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col space-y-2">
                    {["Küçük", "Orta", "Büyük"].map((size) => (
                      <label
                        key={size}
                        className="inline-flex items-center label-left"
                      >
                        <input
                          type="radio"
                          value={size}
                          checked={field.value === size}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="mr-2"
                        />
                        {size}
                      </label>
                    ))}
                    {fieldState.error && (
                      <span className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Hamur */}
            <div>
              <label className="block text-lg font-semibold mb-2 label-left">
                Hamur Seç *
              </label>
              <Controller
                control={control}
                name="dough"
                rules={{
                  validate: (value) =>
                    value !== "Hamur Kalınlığı" || "Lütfen bir hamur seçin",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      className="block w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Hamur Kalınlığı">Hamur Kalınlığı</option>
                      <option value="İnce">İnce</option>
                      <option value="Kalın">Kalın</option>
                    </select>
                    {fieldState.error && (
                      <span className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          {/* Ek Malzemeler */}
          <div>
            <p className="text-lg font-semibold label-left">Ek Malzemeler</p>
            <p className="text-sm label-left" style={{ color: "#5F5F5F" }}>
              En fazla 10 malzeme seçebilirsiniz. 5₺.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 justify-center ">
              {ingredientsList.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center label-left"
                >
                  <Controller
                    control={control}
                    name="extras"
                    rules={{
                      validate: (value) => {
                        if (value.length < 4) {
                          return "En az 4 malzeme seçmelisiniz";
                        }
                        if (value.length > 10) {
                          return "En fazla 10 malzeme seçebilirsiniz";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          type="checkbox"
                          value={item}
                          checked={field.value.includes(item)}
                          onChange={(e) => {
                            let updatedValue = e.target.checked
                              ? [...field.value, item]
                              : field.value.filter((v) => v !== item);

                            if (updatedValue.length <= 10) {
                              field.onChange(updatedValue);
                              setValue("extras", updatedValue, {
                                shouldValidate: true,
                              });
                            }
                          }}
                          className="mr-2"
                        />
                        <span
                          className="font-semibold"
                          style={{ texcolor: "#292929" }}
                        >
                          {item}
                        </span>
                      </>
                    )}
                  />
                </div>
              ))}
            </div>
            {/* Hata Mesajı */}
            {errors.extras && (
              <p className="text-red-500 text-sm mt-3">
                {errors.extras.message}
              </p>
            )}
          </div>

          {/* Ad Soyad */}
          <FormGroup>
            <Label
              for="name"
              className="mt-4 block font-semibold text-lg label-left"
            >
              Ad Soyad *
            </Label>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Ad Soyad zorunludur" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Adınızı ve Soyadınızı girin"
                    className="block w-full p-2 border border-gray-300"
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </FormGroup>

          {/* Not */}
          <FormGroup>
            <Label
              for="note"
              className="mt-4 block font-semibold text-lg label-left"
            >
              Sipariş Notu
            </Label>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <Input
                  {...field}
                  type="textarea"
                  placeholder="Siparişinize eklemek istediğiniz bir not var mı?"
                  className="text-center"
                />
              )}
            />
          </FormGroup>

          {/* Çizgi */}
          <div className="border-t border-gray-300 pt-3"></div>

          {/* Sayı + Toplam */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-start w-full">
            {/* Sayaç */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  const newQuantity = quantity - 1;
                  if (newQuantity >= 1) setQuantity(newQuantity);
                }}
                className="w-10 h-10 text-black font-bold rounded"
                style={{ backgroundColor: "#FDC913" }}
              >
                −
              </button>
              <span className="text-xl  w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 text-black font-bold rounded"
                style={{ backgroundColor: "#FDC913" }}
              >
                +
              </button>
            </div>

            {/* Toplam */}
            <div className="w-full md:w-2/3 lg:w-1/2 bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center">
              <h6 className="text-lg font-bold mb-4 text-gray-800">
                Sipariş Toplamı
              </h6>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Seçimler:</span>
                <span className="text-gray-800">
                  {(watchExtras.length * 5 * quantity).toFixed(2)}₺
                </span>
              </div>
              <div className="flex justify-between items-center text-red-600">
                <span>Toplam:</span>
                <span>{total.toFixed(2)}₺</span>
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-4 w-full block font-semibold py-2 px-4 rounded ${
                  isValid
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Sipariş Ver
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default OrderPizza;
