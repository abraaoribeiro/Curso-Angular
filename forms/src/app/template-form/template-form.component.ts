import { ConsultaCepService } from "./../shared/services/consulta-cep.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.css"]
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    // nome: 'Abraao',
    // email: 'abraao@email.com'
  };

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {}
  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }
  aplicaCssErro(campo) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "has-feedback": this.verificaValidTouched(campo)
    };
  }

  onSubmit(form) {
    // console.log(form);
    // console.log(this.usuario);
    this.http
      .post("https://httpbin.org/post", JSON.stringify(form.value))
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });
  }
  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, "");
    if (cep != null && cep !== "") {
      this.cepService
        .consultaCEP(cep)
        .subscribe(dados => this.popularDadosForm(dados, form));
    }
  }

  popularDadosForm(dados, formulario) {
    /*   form.setValue({
          nome: formulario.value.nome,
          email: formulario.value.email,
          endereco: {
          cep:dados.cep,
          numero:'',
          complemento:dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf,
        }
       }); */

    formulario.form.patchValue({
      endereco: {
        // cep: dados.cep,
        numero: "",
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        numero: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
