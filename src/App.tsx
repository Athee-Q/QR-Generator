import { useState } from "react"
import QRCode from 'qrcode'

function App() {

  const [qrcode, setQrcode] = useState<string>("");
  const [url, setUrl] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);



  const generateQR = async () => {

    setLoading(true)
    try {
      const options: QRCode.QRCodeToDataURLOptions = {
        errorCorrectionLevel: 'H',
        width: parseInt(width),
        type: 'image/png',
        margin: 2,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF"
        }
      }
      const quickResponse: string = await QRCode.toDataURL(url, options,)
      console.log(quickResponse)
      setQrcode(quickResponse)
    } catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }
  const downloadQR = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = qrcode;
    downloadLink.download = 'QRcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div >
      <div className="h-screen lg:max-w-xl md:max-w-lg max-w-xs  flex  flex-col justify-center items-center mx-auto gap-6 ">
        <h1 className="text-2xl font-bold uppercase text-indigo-800">QR CODE GENERATOR</h1>
        {loading && <div className="animate-spin h-8 w-8 border-4 ease-in duration-200 transition-all border-dotted border-t-indigo-400 rounded-full mr-3 "></div>}
        {qrcode && <img src={qrcode} alt="QR-Code" className="w-52 h-52"/>}
        <div className="grid gap-4">
          <div className="flex flex-col">
            <label htmlFor="dataInput" className='font-medium text-slate-400 uppercase text-xs'>
              Data for QR code:
            </label>
            <input className="w-full border-2 focus:outline-none rounded-lg px-4 py-2" type="text" id='dataInput' placeholder='Enter data for QR code' value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sizeInput" className='font-medium text-slate-400 uppercase text-xs'>
              Image size (e.g.,250):
            </label>
            <input type="text" id='sizeInput' placeholder='Enter image size' className="w-full border-2 focus:outline-none rounded-lg px-4 py-2" value={width} onChange={e => setWidth(e.target.value)} />
          </div>
          <div className="flex gap-4">
            <button type="button" className={`bg-indigo-400 text-white py-2 px-4 rounded-xl border-2 font-semibold hover:bg-slate-400 hover:text-white duration-75 ease-linear transition-all `} onClick={generateQR}>Generate QR Code</button>
            <button type="button" className={`bg-white text-indigo-400 py-2 px-4 rounded-xl border-2 font-semibold hover:bg-slate-400 hover:text-white duration-75 ease-linear transition-all `} onClick={downloadQR}>Download QR Code</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
