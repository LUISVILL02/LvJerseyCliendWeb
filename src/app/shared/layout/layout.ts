import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "../header/header";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    imports: [RouterOutlet, Header],
})
export class LayoutComponent {
    
}