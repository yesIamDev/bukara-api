import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import cloudinary from 'cloudinary'
import fs from 'fs'
import i from 'interface'

export default class uploadFile {

  private static getFilePath(file: any): string {
    return `` + fs.createReadStream(file.tmpPath!).path
  }


  // private static getFilePath(files: any[]): string[] {
  //   let fileArray: string[] = []

  //   files.forEach((v) => {
  //     fileArray.push(`${fs.createReadStream(v.tmpPath!).path}`)
  //   })

  //   return fileArray
  // }

  public static async single(file: any) {


    cloudinary.v2.config({
      cloud_name: 'dev-maurice',
      api_key: '238948438153958',
      api_secret: 'rgWCxdByFg2fkMsW9pr_zbY_K5s',
    })
    // await cloudinary.upload(this.getFilePath(file))
    return await cloudinary.v2.uploader.upload(this.getFilePath(file))
  }

  public static async multiple(files: MultipartFileContract[]): Promise<i.IAppartementImage[]> {


    cloudinary.v2.config({
      cloud_name: 'dev-maurice',
      api_key: '238948438153958',
      api_secret: 'rgWCxdByFg2fkMsW9pr_zbY_K5s',
    })


    var imagesPahs: string[] = []  

    files.map(async (img) => {
      imagesPahs.push(`${fs.createReadStream(img.tmpPath!).path}`)
    })

    var imageUrlList: Array<i.IAppartementImage> = [];
    for (var i = 0; i < imagesPahs.length; i++) {
      // if (imagesPahs[i]) {

      var reslt = await cloudinary.v2.uploader.upload(imagesPahs[i])
      imageUrlList.push({ url: reslt.url })
      // }
    }

    return imageUrlList
    // return imagesPahs
  }
}
