import EmailChange from './email-change/email-change'
import PasswordChangeComponent from './password-change/password-change'
import SessionsComponent from './sessions/sessions'
import TvPendingsSett from './tv-settings/tv-settings'

export default function AccountSettings() {
	return (
		<div className="">
			<div className="space-y-6">
				<h2 className="text-xl font-semibold text-white">Аккаунт</h2>

				<div className="space-y-4">
					<div>
						<EmailChange />
					</div>
					<div>
						<PasswordChangeComponent />
					</div>
					<div>
						<SessionsComponent />
					</div>
					<div>
						<TvPendingsSett />
					</div>
				</div>
			</div>
		</div>
	)
}
